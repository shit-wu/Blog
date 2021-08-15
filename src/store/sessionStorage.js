let listeners = new Set();
let values = {};

export function setSessionStorage(name, content) {
    values[name] = content;

    listeners.forEach((f) => f(name));
}

export function getSessionStorage(name) {
    return values[name];
}

export function registerSessionStorageListener(listener) {
    listeners.add(listener);
}

export function unregisterSessionStorageListener(listener) {
    listeners.delete(listener);
}
