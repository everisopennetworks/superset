"use strict";

exports.__esModule = true;
exports.ticketManager = exports.TicketManager = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const cs = "c528e517-7d15-496f-9f8f-e9850f108b9c";
class TicketManager {
  constructor() {
    this.createTickedUrl = 'https://superset.priv.ugg.tech/trouble-ticket/table/incident';
    this.oauthUrl = 'https://login.priv.ugg.tech/ugg-iam/oidc/token?grant_type=client_credentials&client_id=assurance&client_secret=373b952f-4bf3-47d2-a3f4-7a10531a981f&scope=out_servicenow_api';
    this.associateTicketUrl = 'https://superset.priv.ugg.tech/api/v1/alarm/associateTicket';

    this.getAuthToken = async () => {
      const tokenResponse = await _axios.default.post(this.oauthUrl);
      return tokenResponse.data;
    };

    this.createTicket = async ({
      shortDescription,
      impact,
      urgency,
      alarms
    }) => {
      let description = '';
      alarms.forEach(alarm => {
        description = description.concat(`${alarm.ALARMEDOBJECTNAME} ${alarm.ALARMTYPEID} ${alarm.SPECIFICPROBLEM}\n`);
      });
      const ticket = {
        short_description: shortDescription,
        impact: impact.toString(),
        urgency: urgency.toString(),
        description,
        category: 'inquiry'
      };
      const token = await this.getAuthToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json'
        }
      };

      try {
        const response = await _axios.default.post(this.createTickedUrl, ticket, config);
        return this.associateTickets(response.data.result, alarms);
      } catch (err) {
        return false;
      }
    };

    this.associateTickets = async (ticket, alarms) => {
      const response = await _axios.default.all(alarms.map(alarm => {
        const association = {
          alarmId: alarm.ALARMID,
          incidentNumber: ticket.number,
          incidentSysId: ticket.sys_id
        };
        return _axios.default.put(this.associateTicketUrl, association);
      }));
      return !!response;
    };
  }

}

exports.TicketManager = TicketManager;
const ticketManager = new TicketManager();
exports.ticketManager = ticketManager;