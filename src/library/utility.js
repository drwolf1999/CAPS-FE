export default class Utility {
    static dateFormat(d) {
        d = new Date(d);
        const [
            year,
            month,
            day,
            hour,
            minute,
            sec
        ] = [
            this.paddingStart(d.getFullYear()),
            this.paddingStart(d.getMonth() + 1),
            this.paddingStart(d.getDay()),
            this.paddingStart(d.getHours()),
            this.paddingStart(d.getMinutes()),
            this.paddingStart(d.getSeconds())
        ];
        return `${year}/${month}/${day} ${hour}:${minute}:${sec}`;
    }

    static paddingStart(data, size = 2, pad = '0') {
        let ret = data;
        while (data.length < size) {
            ret = pad + ret;
        }
        return ret;
    }
}