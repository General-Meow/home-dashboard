class LineStatus {
  constructor(id, name, statuses, created) {
    this.id = id
    this.name = name
    this.statuses = statuses
    this.created = created
  }
}

class StatusDetail {
  constructor(status, description) {
    this.status = status
    this.description = description
  }
}
module.exports = {LineStatus, StatusDetail}