import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('WS initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${client.id} connected. Args: ${args}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} disconnected`);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    return {
      event: 'messageToClient',
      data: 'Hello world!',
    };
  }
}
