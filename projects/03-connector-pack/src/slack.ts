import { Connector, ConnectorConfig, withRetry } from './connector.js';

export class SlackConnector implements Connector<{ channel: string; text: string }, void> {
  readonly name = 'slack';
  constructor(private config: ConnectorConfig) {}

  async test(): Promise<boolean> {
    return Boolean(this.config.accessToken);
  }

  async send(payload: { channel: string; text: string }): Promise<void> {
    await withRetry(async () => {
      const res = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Slack error ${res.status}`);
    });
  }
}
