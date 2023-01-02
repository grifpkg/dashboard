// import WebSocket from 'ws';

export class Task {
    tid: number
    sid: string
    t: number
    n: string
    s: number
    c: Task[]
    h: number

    get taskId(): number {
        return this.tid
    }

    get serviceId(): string {
        return this.sid
    }

    get type(): Type {
        return this.t
    }

    get name(): string {
        return this.n
    }

    get stage(): Stage {
        return this.s
    }

    get children(): Task[] {
        return this.c
    }

    get history(): number {
        return this.h
    }

    public static fromObject(obj: any) {
        return new Task(
            obj.tid,
            obj.sid,
            obj.t,
            obj.n,
            obj.s,
            []
        )
    }

    get buffer() {
        if (this.stage > 0) return 100;
        return 0
    }

    get indeterminate() {
        return this.stage == 0 || this.progress == 0
    }

    get stream() {
        return this.stage == 1 || this.stage > 2 || this.progress >= 90 || this.buffer > 0
    }

    get progress() {
        if (this.stage == 3) return 90;
        if (this.history)
            return (
                (100 / this.history) *
                (this.history - this.children.length) -
                10
            );
        return this.stage == 2 ? 50 : 0;
    }

    constructor(tid: number, sid: string, t: number, n: string, s: number, c: Task[]) {
        this.tid = tid
        this.sid = sid
        this.t = t
        this.n = n
        this.s = s
        this.c = c
        this.h = this.c.length
    }
}

export enum Type {
    BUCKET,
    AUTHOR,
    RESOURCE,
    RELEASE,
    FILE
}

export enum Event {
    SCHEDULE,
    STAGE,
    END
}

export enum Stage {
    SCHEDULED = 0,
    FETCHING = 1,
    PROCESSING = 2,
    SAVING = 3
}

export default class Robosocket {

    url: string
    tasks: Task[]
    ws: WebSocket | null
    connected: boolean
    private tmap: Map<number, Task>

    constructor(url: string = 'ws://localhost:8080') {
        this.url = url
        this.tasks = []
        this.connected = false
        this.tmap = new Map()
        this.ws = null
    }

    listen() {
        this.ws = new WebSocket(this.url)
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data.toString())
            if (!this.connected) {
                this.tasks = data.map((t: any) => Task.fromObject(t))
                for (const task of this.tasks) {
                    this.tmap.set(task.tid, task)
                }
                this.connected = true
            } else {
                switch (data.ev) {
                    case Event.SCHEDULE:
                        let container: Task[] | null = this.tasks
                        if (data.ptid) {
                            const parent = this.tmap.get(data.ptid)
                            if (parent) {
                                parent.h++
                                container = parent.c
                            } else {
                                container = null
                            }
                        }
                        if (container) {
                            const i = container.push(new Task(
                                data.tid,
                                data.sid,
                                data.t,
                                data.n,
                                Stage.SCHEDULED,
                                []
                            ))
                            this.tmap.set(data.tid, container[i - 1])
                        }
                        break;
                    case Event.STAGE:
                        const task = this.tmap.get(data.tid)
                        if (task) {
                            task.s = data.s
                        }
                        break;
                    case Event.END:
                        const top = this.tmap.get(data.ptid)
                        if (top) {
                            const ended = this.tmap.get(data.tid)
                            if (ended) {
                                this.clear(ended)
                                const i = top.c.indexOf(ended)
                                if (i > -1) top.c.splice(i, 1)
                            }
                        }
                        break;
                    default:
                        throw new Error('unexpected event')
                }
            }
        }
    }

    /**
     * clear orphans
     */
    clear(task: Task) {
        if (task) {
            this.tmap.delete(task.tid)
            for (const orphan of task.c) {
                this.clear(orphan)
            }
        }
    }

}