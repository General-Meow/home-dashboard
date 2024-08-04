import {TrainRoute} from "./TravelData";

export class LineStatus {
  id: string;
  name: string;
  statuses: Array<StatusDetail>;

  constructor(id: string, name: string, statuses: Array<StatusDetail>) {
    this.id = id
    this.name = name
    this.statuses = statuses
  }
}

export class StatusDetail {
  status: string;
  description: string;

  constructor(status: string, description: string) {
    this.status = status
    this.description = description
  }
}

export class AllStatus {
  lineStatuses: Array<LineStatus | TrainRoute>;
  createdDate: Date;

  constructor(lineStatuses: Array<LineStatus | TrainRoute>, createdDate: Date) {
    this.lineStatuses = lineStatuses;
    this.createdDate = createdDate;
  }
}