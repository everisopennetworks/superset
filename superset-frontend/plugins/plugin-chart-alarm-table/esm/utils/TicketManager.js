import axios from 'axios'; //const cs = "c528e517-7d15-496f-9f8f-e9850f108b9c";

export class TicketManager {
  constructor() {
    this.createTickedUrl = 'https://superset.priv.ugg.tech/trouble-ticket/table/incident';
    this.oauthUrl = 'https://login.priv.ugg.tech/ugg-iam/oidc/token?grant_type=client_credentials&client_id=assurance&client_secret=373b952f-4bf3-47d2-a3f4-7a10531a981f&scope=out_servicenow_api';
    this.associateTicketUrl = 'https://superset.priv.ugg.tech/api/v1/alarm/associateTicket';

    this.getAuthToken = async () => {
      const tokenResponse = await axios.post(this.oauthUrl);
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
        const response = await axios.post(this.createTickedUrl, ticket, config);
        return this.associateTickets(response.data.result, alarms);
      } catch (err) {
        return false;
      }
    };

    this.associateTickets = async (ticket, alarms) => {
      const response = await axios.all(alarms.map(alarm => {
        const association = {
          alarmId: alarm.ALARMID,
          incidentNumber: ticket.number,
          incidentSysId: ticket.sys_id
        };
        return axios.put(this.associateTicketUrl, association);
      }));
      return !!response;
    };
  }

}
const ticketManager = new TicketManager();
export { ticketManager };