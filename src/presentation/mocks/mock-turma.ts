export class AddTurmaSpy {
  params: any
  async add (params): Promise<void> {
    this.params = params
  }
}
