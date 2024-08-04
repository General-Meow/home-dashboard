/**
 * [
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "bakerloo",
 *     "name": "Bakerloo",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.917Z",
 *     "modified": "2024-07-23T17:18:13.917Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "bakerloo",
 *         "statusSeverity": 5,
 *         "statusSeverityDescription": "Part Closure",
 *         "reason": "BAKERLOO LINE: Saturday 3 to Thursday 8 August, no service between Queens Park and Harrow & Wealdstone. No LONDON OVERGROUND service between Euston and Watford Junction. Use LONDON NORTHWESTERN and SOUTHERN services for Wembley Central and Harrow & Wealdstone, where available. Special bus services operate.",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T03:30:00Z",
 *             "toDate": "2024-08-09T00:29:00Z",
 *             "isNow": false
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "PlannedWork",
 *           "categoryDescription": "PlannedWork",
 *           "description": "BAKERLOO LINE: Saturday 3 to Thursday 8 August, no service between Queens Park and Harrow & Wealdstone. No LONDON OVERGROUND service between Euston and Watford Junction. Use LONDON NORTHWESTERN and SOUTHERN services for Wembley Central and Harrow & Wealdstone, where available. Special bus services operate.",
 *           "additionalInfo": "Special bus services operate:Route 718: Queens Park - Kensal Green - Willesden Junction (Harrow Road entrance) - Harlesden Town Centre (Jubilee Clock / Manor Park Road), for Harlesden station - Stonebridge Park (Harrow Road) - Wembley High Road (Park Lane) - Wembley Central - North Wembley - Preston Road (for Metropolitan line and South Kenton via London Buses route 223) - Kenton - Harrow & Wealdstone.Route 719: Operates Monday 5 to Thursday 8 August only: Queens Park - Kensal Green - Willesden Junction (Harrow Road entrance) - Harlesden Town Centre (Jubilee Clock / Manor Park Road), for Harlesden station - Stonebridge Park (Harrow Road) - Wembley High Road (Park Lane), for Wembley Central station - Wembley Park (for Jubilee and Metropolitan lines)",
 *           "created": "2024-07-09T13:22:00Z",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "partClosure"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Bakerloo&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "central",
 *     "name": "Central",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.93Z",
 *     "modified": "2024-07-23T17:18:13.93Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "central",
 *         "statusSeverity": 9,
 *         "statusSeverityDescription": "Minor Delays",
 *         "reason": "Central Line: Minor delays due to train cancellations. ",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T10:59:48Z",
 *             "toDate": "2024-08-04T00:29:00Z",
 *             "isNow": true
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "RealTime",
 *           "categoryDescription": "RealTime",
 *           "description": "Central Line: Minor delays due to train cancellations. ",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "minorDelays"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Central&serviceTypes=Regular"
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Night",
 *         "uri": "/Line/Route?ids=Central&serviceTypes=Night"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "circle",
 *     "name": "Circle",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.93Z",
 *     "modified": "2024-07-23T17:18:13.93Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "statusSeverity": 10,
 *         "statusSeverityDescription": "Good Service",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": []
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Circle&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "district",
 *     "name": "District",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.917Z",
 *     "modified": "2024-07-23T17:18:13.917Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "statusSeverity": 10,
 *         "statusSeverityDescription": "Good Service",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": []
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=District&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "dlr",
 *     "name": "DLR",
 *     "modeName": "dlr",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.947Z",
 *     "modified": "2024-07-23T17:18:13.947Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "dlr",
 *         "statusSeverity": 7,
 *         "statusSeverityDescription": "Reduced Service",
 *         "reason": "DOCKLANDS LIGHT RAILWAY: Thursday 01 until Sunday 04 August inclusive: a reduced service is operating between Stratford and Lewisham and between Beckton and Canning Town. This is while we work to increase the capacity of our depot in preparation for the introduction of new DLR trains. During this work trains are running at a reduced frequency, so please allow extra time for your journey.",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T03:15:00Z",
 *             "toDate": "2024-08-03T22:59:00Z",
 *             "isNow": false
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "PlannedWork",
 *           "categoryDescription": "PlannedWork",
 *           "description": "DOCKLANDS LIGHT RAILWAY: Thursday 01 until Sunday 04 August inclusive: a reduced service is operating between Stratford and Lewisham and between Beckton and Canning Town. This is while we work to increase the capacity of our depot in preparation for the introduction of new DLR trains. During this work trains are running at a reduced frequency, so please allow extra time for your journey.",
 *           "created": "2024-07-09T14:21:00Z",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "reducedService"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=DLR&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "hammersmith-city",
 *     "name": "Hammersmith & City",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.917Z",
 *     "modified": "2024-07-23T17:18:13.917Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "statusSeverity": 10,
 *         "statusSeverityDescription": "Good Service",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": []
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Hammersmith & City&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "jubilee",
 *     "name": "Jubilee",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.93Z",
 *     "modified": "2024-07-23T17:18:13.93Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "jubilee",
 *         "statusSeverity": 9,
 *         "statusSeverityDescription": "Minor Delays",
 *         "reason": "Jubilee Line: Minor delays due to train cancellations. ",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T12:04:24Z",
 *             "toDate": "2024-08-04T00:29:00Z",
 *             "isNow": true
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "RealTime",
 *           "categoryDescription": "RealTime",
 *           "description": "Jubilee Line: Minor delays due to train cancellations. ",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "minorDelays"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Jubilee&serviceTypes=Regular"
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Night",
 *         "uri": "/Line/Route?ids=Jubilee&serviceTypes=Night"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "london-overground",
 *     "name": "London Overground",
 *     "modeName": "overground",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.917Z",
 *     "modified": "2024-07-23T17:18:13.917Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "london-overground",
 *         "statusSeverity": 5,
 *         "statusSeverityDescription": "Part Closure",
 *         "reason": "LONDON OVERGROUND: Saturday 20 July to Sunday 4 August, no service between Hackney Downs and Chingford. Replacement bus service L3 operates between Hackney Downs and Chingford via Clapton, St James Street, Walthamstow Central, Wood Street and Highams Park.",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T03:15:00Z",
 *             "toDate": "2024-08-03T22:59:00Z",
 *             "isNow": false
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "PlannedWork",
 *           "categoryDescription": "PlannedWork",
 *           "description": "LONDON OVERGROUND: Saturday 20 July to Sunday 4 August, no service between Hackney Downs and Chingford. Replacement bus service L3 operates between Hackney Downs and Chingford via Clapton, St James Street, Walthamstow Central, Wood Street and Highams Park.",
 *           "created": "2024-06-19T16:02:00Z",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "partClosure"
 *         }
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "london-overground",
 *         "statusSeverity": 5,
 *         "statusSeverityDescription": "Part Closure",
 *         "reason": "LONDON OVERGROUND: Saturday 3 to Thursday 8 August, no service between Euston and Watford Junction. No BAKERLOO LINE service between Queens Park and Harrow & Wealdstone. Use LONDON NORTHWESTERN and SOUTHERN services for Wembley Central, Harrow & Wealdstone and Bushey, where available. Special bus services operate.",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T03:30:00Z",
 *             "toDate": "2024-08-09T00:29:00Z",
 *             "isNow": false
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "PlannedWork",
 *           "categoryDescription": "PlannedWork",
 *           "description": "LONDON OVERGROUND: Saturday 3 to Thursday 8 August, no service between Euston and Watford Junction. No BAKERLOO LINE service between Queens Park and Harrow & Wealdstone. Use LONDON NORTHWESTERN and SOUTHERN services for Wembley Central, Harrow & Wealdstone and Bushey, where available. Special bus services operate.",
 *           "additionalInfo": "Special bus services operate:Route 718: Queens Park - Kensal Green - Willesden Junction (Harrow Road entrance) - Harlesden Town Centre (Jubilee Clock / Manor Park Road), for Harlesden station - Stonebridge Park (Harrow Road) - Wembley High Road (Park Lane) - Wembley Central - North Wembley - Preston Road (for Metropolitan line and South Kenton via London Buses route 223) - Kenton - Harrow & Wealdstone. NOTE: On Monday 5 August, after 2100 only, buses will not serve Wembley Central and North Wembley. For Wembley Central, board and alight at the Wembley High Road (Park Lane) stops. Diverted buses will stop at Wembley Hill Road (East Lane / Beechcroft Gardens) for North Wembley.NOTE: At North Wembley, stops served are subject to change due to ongoing gas main works. If bus stops at North Wembley station are closed, buses will serve stops east of the station at Pembroke Road;Route 719: Operates Monday 5 to Thursday 8 August only: Queens Park - Kensal Green - Willesden Junction (Harrow Road entrance) - Harlesden Town Centre (Jubilee Clock / Manor Park Road), for Harlesden station - Stonebridge Park (Harrow Road) - Wembley High Road (Park Lane), for Wembley Central station - Wembley Park (for Jubilee and Metropolitan lines);Route 720: Harrow-on-the-Hill (for Metropolitan line) - Harrow & Wealdstone - Headstone Lane - Hatch End (Harrow Arts Centre) - Carpenders Park (Prestwick Road) - Bushey (Eastbury Road) - Watford High Street - Watford Junction;",
 *           "created": "2024-07-09T13:31:00Z",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "partClosure"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=London Overground&serviceTypes=Regular"
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Night",
 *         "uri": "/Line/Route?ids=London Overground&serviceTypes=Night"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "metropolitan",
 *     "name": "Metropolitan",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.93Z",
 *     "modified": "2024-07-23T17:18:13.93Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "statusSeverity": 10,
 *         "statusSeverityDescription": "Good Service",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": []
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Metropolitan&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "northern",
 *     "name": "Northern",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.917Z",
 *     "modified": "2024-07-23T17:18:13.917Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "statusSeverity": 10,
 *         "statusSeverityDescription": "Good Service",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": []
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Northern&serviceTypes=Regular"
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Night",
 *         "uri": "/Line/Route?ids=Northern&serviceTypes=Night"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "piccadilly",
 *     "name": "Piccadilly",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.93Z",
 *     "modified": "2024-07-23T17:18:13.93Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "piccadilly",
 *         "statusSeverity": 5,
 *         "statusSeverityDescription": "Part Closure",
 *         "reason": "PICCADILLY LINE: Saturday 3 August, from 0330 and all day Sunday 4 August, no service between Kings Cross St Pancras and Cockfosters. Replacement buses operate.",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-03T02:30:00Z",
 *             "toDate": "2024-08-05T00:29:00Z",
 *             "isNow": false
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "PlannedWork",
 *           "categoryDescription": "PlannedWork",
 *           "description": "PICCADILLY LINE: Saturday 3 August, from 0330 and all day Sunday 4 August, no service between Kings Cross St Pancras and Cockfosters. Replacement buses operate.",
 *           "additionalInfo": "Replacement buses operate:Service PL5: Finchley Central (for Northern line) - Arnos Grove - Southgate - Oakwood - Cockfosters;Service PL6: Finsbury Park (for Victoria line) - Manor House - Turnpike Lane - Wood Green - Bounds Green - New Southgate (for Great Northern) - Arnos Grove;",
 *           "created": "2024-07-09T14:18:00Z",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "partClosure"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Piccadilly&serviceTypes=Regular"
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Night",
 *         "uri": "/Line/Route?ids=Piccadilly&serviceTypes=Night"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "victoria",
 *     "name": "Victoria",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.93Z",
 *     "modified": "2024-07-23T17:18:13.93Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "statusSeverity": 10,
 *         "statusSeverityDescription": "Good Service",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": []
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Victoria&serviceTypes=Regular"
 *       },
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Night",
 *         "uri": "/Line/Route?ids=Victoria&serviceTypes=Night"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
 *     "id": "waterloo-city",
 *     "name": "Waterloo & City",
 *     "modeName": "tube",
 *     "disruptions": [],
 *     "created": "2024-07-23T17:18:13.947Z",
 *     "modified": "2024-07-23T17:18:13.947Z",
 *     "lineStatuses": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
 *         "id": 0,
 *         "lineId": "waterloo-city",
 *         "statusSeverity": 4,
 *         "statusSeverityDescription": "Planned Closure",
 *         "reason": "Waterloo & City line: Service operates Monday to Friday between 06:00 and 00:30 only. There is no service on Saturdays, Sundays and on public/bank holidays.",
 *         "created": "0001-01-01T00:00:00",
 *         "validityPeriods": [
 *           {
 *             "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
 *             "fromDate": "2024-08-02T23:30:00Z",
 *             "toDate": "2024-08-03T22:59:00Z",
 *             "isNow": false
 *           }
 *         ],
 *         "disruption": {
 *           "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
 *           "category": "PlannedWork",
 *           "categoryDescription": "PlannedWork",
 *           "description": "Waterloo & City line: Service operates Monday to Friday between 06:00 and 00:30 only. There is no service on Saturdays, Sundays and on public/bank holidays.",
 *           "created": "2023-01-16T05:24:00Z",
 *           "affectedRoutes": [],
 *           "affectedStops": [],
 *           "closureText": "plannedClosure"
 *         }
 *       }
 *     ],
 *     "routeSections": [],
 *     "serviceTypes": [
 *       {
 *         "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
 *         "name": "Regular",
 *         "uri": "/Line/Route?ids=Waterloo & City&serviceTypes=Regular"
 *       }
 *     ],
 *     "crowding": {
 *       "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
 *     }
 *   }
 * ]
 */

export default interface TflStatusResponse {
    id: string;
    name: string;
    modeName: string;
    created: Date;
    modified: Date;
    lineStatuses: Array<TflLineStatus>;
}

export interface TflLineStatus {
    id: number,
    lineId: string;
    statusSeverity: number;
    statusSeverityDescription: string;
    reason: string;
    created: Date;
}


/**
 * New cross overground response
 * [
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-1228814185",
 *     "operationType": 1,
 *     "vehicleId": "202408038093567",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 726,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:20:00Z",
 *     "timeToLive": "2024-08-03T16:08:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-913476720",
 *     "operationType": 1,
 *     "vehicleId": "202408038093570",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 1626,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:35:00Z",
 *     "timeToLive": "2024-08-03T16:08:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "744816363",
 *     "operationType": 1,
 *     "vehicleId": "202408038093573",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 2526,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:50:00Z",
 *     "timeToLive": "2024-08-03T16:08:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "429504498",
 *     "operationType": 1,
 *     "vehicleId": "202408038093576",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 3426,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T17:05:00Z",
 *     "timeToLive": "2024-08-03T16:08:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "2087789389",
 *     "operationType": 1,
 *     "vehicleId": "202408038093579",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 4326,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T17:20:00Z",
 *     "timeToLive": "2024-08-03T16:08:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-1891800506",
 *     "operationType": 1,
 *     "vehicleId": "202408038093582",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 5226,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T17:35:00Z",
 *     "timeToLive": "2024-08-03T16:08:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-241905247",
 *     "operationType": 1,
 *     "vehicleId": "202408038093585",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 6126,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T17:50:00Z",
 *     "timeToLive": "2024-08-03T16:08:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-557207896",
 *     "operationType": 1,
 *     "vehicleId": "202408038093588",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "",
 *     "bearing": "",
 *     "destinationNaptanId": "HUBNWX",
 *     "destinationName": "New Cross ELL Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 7026,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T18:05:00Z",
 *     "timeToLive": "2024-08-03T16:08:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "1416584506",
 *     "operationType": 1,
 *     "vehicleId": "202408038093774",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 39,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:33Z",
 *     "timeToLive": "2024-08-03T16:12:33Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-1228486507",
 *     "operationType": 1,
 *     "vehicleId": "202408038093777",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 40,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:34Z",
 *     "timeToLive": "2024-08-03T16:27:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-914197618",
 *     "operationType": 1,
 *     "vehicleId": "202408038093780",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 40,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:34Z",
 *     "timeToLive": "2024-08-03T16:42:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "744881897",
 *     "operationType": 1,
 *     "vehicleId": "202408038093783",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 40,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:34Z",
 *     "timeToLive": "2024-08-03T16:57:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "429832176",
 *     "operationType": 1,
 *     "vehicleId": "202408038093786",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 40,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:34Z",
 *     "timeToLive": "2024-08-03T17:12:34Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "2088117067",
 *     "operationType": 1,
 *     "vehicleId": "202408038093789",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 41,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:35Z",
 *     "timeToLive": "2024-08-03T17:27:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-1892521404",
 *     "operationType": 1,
 *     "vehicleId": "202408038093792",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 41,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:35Z",
 *     "timeToLive": "2024-08-03T17:42:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   },
 *   {
 *     "$type": "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities",
 *     "id": "-241839649",
 *     "operationType": 1,
 *     "vehicleId": "202408038093795",
 *     "naptanId": "HUBNWX",
 *     "stationName": "New Cross ELL Rail Station",
 *     "lineId": "london-overground",
 *     "lineName": "London Overground",
 *     "platformName": "D",
 *     "direction": "inbound",
 *     "bearing": "",
 *     "destinationNaptanId": "910GDALS",
 *     "destinationName": "Dalston Junction Rail Station",
 *     "timestamp": "2024-08-03T16:07:54.970962Z",
 *     "timeToStation": 41,
 *     "currentLocation": "",
 *     "towards": "",
 *     "expectedArrival": "2024-08-03T16:08:35Z",
 *     "timeToLive": "2024-08-03T17:57:35Z",
 *     "modeName": "overground",
 *     "timing": {
 *       "$type": "Tfl.Api.Presentation.Entities.PredictionTiming, Tfl.Api.Presentation.Entities",
 *       "countdownServerAdjustment": "00:00:00",
 *       "source": "0001-01-01T00:00:00",
 *       "insert": "0001-01-01T00:00:00",
 *       "read": "2024-08-03T16:08:35.609Z",
 *       "sent": "2024-08-03T16:07:54Z",
 *       "received": "0001-01-01T00:00:00"
 *     }
 *   }
 * ]
 */

export interface OvergroundArrivalResponse {
    id: string;
    operationType: number;
    vehicleId: string;
    naptanId: string;
    stationName: string;
    lineId: string;
    lineName: string;
    platformName: string;
    direction: string;
    bearing: string;
    destinationNaptanId: string;
    destinationName: string;
    timestamp: Date
    timeToStation: number;
    currentLocation: string;
    towards: string;
    expectedArrival: Date;
    timeToLive: Date;
    modeName: string;
}