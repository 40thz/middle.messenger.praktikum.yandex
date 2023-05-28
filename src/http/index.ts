import fetch from '../modules/Fetch'

export default abstract class http {
  protected http: fetch

  protected constructor(endpoint: string) {
    this.http = new fetch(endpoint)
  }

  public abstract create?(data: unknown): Promise<unknown>

  public abstract read?(identifier?: string): Promise<unknown>

  public abstract update?(data: unknown): Promise<unknown>

  public abstract delete?(identifier: string): Promise<unknown>
}
