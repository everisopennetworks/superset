export declare class TicketManager {
    createTickedUrl: string;
    oauthUrl: string;
    associateTicketUrl: string;
    private getAuthToken;
    createTicket: ({ shortDescription, impact, urgency, alarms }: any) => Promise<boolean>;
    associateTickets: (ticket: any, alarms: any) => Promise<boolean>;
}
declare const ticketManager: TicketManager;
export { ticketManager };
//# sourceMappingURL=TicketManager.d.ts.map