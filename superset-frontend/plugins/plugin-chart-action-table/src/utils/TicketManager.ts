import axios from 'axios';

export class TicketManager {
  createTickedUrl = 'https://uggdev.service-now.com/api/now/table/incident/';

  associateTicketUrl = 'http://20.82.48.135:8080/api/v1/alarm/associateTicket';

  createTicket = async ({ shortDescription, impact, urgency, alarms }) => {
    const description = '';
    alarms.forEach((alarm: any) => {
      description.concat(
        `${alarm.ALARMEDOBJECTNAME} ${alarm.ALARMTYPEID} ${alarm.SPECIFICPROBLEM}\n`,
      );
    });
    const ticket = {
      short_description: shortDescription,
      impact,
      urgency,
      description,
    };

    try {
      const response = await axios.post(this.createTickedUrl, ticket);
      console.log(response)
      return this.associateTickets(response, alarms);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  associateTickets = async (ticket: any, alarms: any) => {
    const response = await axios.all(
      alarms.map((alarm: any) => {
        const association = {
          alarmId: alarm.ALARMID,
          incidentNumber: ticket.incidentNumber,
          incidentSysId: ticket.sysid,
        };
        return axios.post(this.associateTicketUrl, association);
      }),
    );

    console.log(response)

    return response;
  };
}

const ticketManager = new TicketManager();
export { ticketManager };
