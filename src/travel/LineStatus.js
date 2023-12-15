class LineStatus {
  constructor(id, name, statuses) {
    this.id = id
    this.name = name
    this.statuses = statuses
  }
}

class StatusDetail {
  constructor(status, description) {
    this.status = status
    this.description = description
  }
}

class AllStatus {
  constructor(lineStatuses, createdDate) {
    this.lineStatuses = lineStatuses;
    this.createdDate = createdDate;
  }
}
module.exports = {LineStatus, StatusDetail, AllStatus}