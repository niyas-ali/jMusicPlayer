export default class StorageManager {
  private static localStorage: Storage = new Storage();
  public getDataByName(name: string) {
    return localStorage.getItem(name);
  }
  public setDataByName(name: string, value: string) {
    return localStorage.setItem(name, value);
  }
  public removeDataByName(name: string) {
    localStorage.removeItem(name);
    return true;
  }
  public clearAllData() {
    localStorage.clear();
  }
}