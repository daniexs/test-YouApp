// // chat.service.ts
// import { Injectable } from '@nestjs/common';
// import { Message } from 'src/schemas/message.schema'; 
// import * as amqp from 'amqplib/callback_api';

// @Injectable()
// export class MessageService {
//   private readonly queue = 'notif_messages';

//   constructor() {
//     this.connectToQueue();
//   }

//   private connectToQueue(): void {
//     amqp.connect('amqps://bcfpjggr:b5ctH0lkgkAKKqgrMXgcUg8KzKYLlDEn@armadillo.rmq.cloudamqp.com/bcfpjggr', (error0, connection) => {
//       if (error0) {
//         throw error0;
//       }

//       connection.createChannel((error1, channel) => {
//         if (error1) {
//           throw error1;
//         }

//         channel.assertQueue(this.queue, {
//           durable: false,
//         });

//         console.log('Connected to RabbitMQ');

//         // Receive messages from RabbitMQ
//         channel.consume(this.queue, (msg) => {
//           if (msg !== null) {
//             const chatMessage: Message = JSON.parse(msg.content.toString());
//             console.log('Received message:', chatMessage);
//             // Process or handle the received chat messag
//             channel.ack(msg);
//           }
//         });
//       });
//     });
//   }

//   async sendMessage(chatMessage: Message): Promise<void> {
//     amqp.connect('amqps://bcfpjggr:b5ctH0lkgkAKKqgrMXgcUg8KzKYLlDEn@armadillo.rmq.cloudamqp.com/bcfpjggr', (error0, connection) => {
//       if (error0) {
//         throw error0;
//       }

//       connection.createChannel((error1, channel) => {
//         if (error1) {
//           throw error1;
//         }

//         channel.assertQueue(this.queue, {
//           durable: false,
//         });

//         channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(chatMessage)));
//         console.log('Sent message:', chatMessage);

//         setTimeout(() => {
//           connection.close();
//         }, 1000);
//       });
//     });
//   }
// }


// chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as amqp from 'amqplib/callback_api';
import { Model } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class ChatService {
  private readonly userAQueue = 'user_a_messages';
  private readonly userBQueue = 'user_b_messages';

  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {
    this.connectToQueue(this.userAQueue);
    this.connectToQueue(this.userBQueue);
  }

  private connectToQueue(queueName: string): void {
    amqp.connect('amqps://bcfpjggr:b5ctH0lkgkAKKqgrMXgcUg8KzKYLlDEn@armadillo.rmq.cloudamqp.com/bcfpjggr', (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queueName, {
          durable: false,
        });

        console.log(`Connected to queue ${queueName}`);

        channel.consume(queueName, (msg) => {
          if (msg !== null) {
            const chatMessage = msg.content.toString();
            console.log(`Received message on ${queueName}:`, chatMessage);
            this.notifyUser(chatMessage); // Notify user about the received message
            channel.ack(msg);
          }
        });
      });
    });
  }

  sendMessage(fromUser: string, toUser: string, message: string): void {
    try {
    const queue = toUser === 'A' ? this.userAQueue : this.userBQueue;
    amqp.connect('amqps://bcfpjggr:b5ctH0lkgkAKKqgrMXgcUg8KzKYLlDEn@armadillo.rmq.cloudamqp.com/bcfpjggr', (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false,
        });

        
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Sent message from ${fromUser} to ${toUser}:`, message);

        setTimeout(() => {
          connection.close();
        }, 1000);
      });
    });
    } catch (error){
      console.log(error)
      return error
    }
  }

  private notifyUser(message: string): void {
    // Logic to notify the user, such as WebSocket or other notification mechanism
    console.log('Notification:', message);
  }
  async saveMessage(data:MessageDto):Promise<any>{
    const newMessage = new this.messageModel(data)
    console.log(newMessage)
    return newMessage.save()
  }

  async readMessage(userId: string): Promise <any> {
    return this.messageModel.find({fromUser: userId}).exec()
  }
}
