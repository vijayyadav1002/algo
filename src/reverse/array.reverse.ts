class LocalArray<T> extends Array<T> {
    reverse(): T[] {
        const arr = [...this];
        const result = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            result.push(arr[i]);
        }
        return result;
    }
    reverse2(): T[] {
        return this.reduce((acc: T[], curr: T) => {
            acc.unshift(curr);
            return acc;
        }, [] as T[]);
    }
    reverse3(): T[] {
        return this.reduce((acc: T[], curr) => [curr, ...acc], [])
    }
}

export { LocalArray }

