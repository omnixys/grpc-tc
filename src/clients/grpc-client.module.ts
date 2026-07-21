import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

export interface GrpcClientOptions {
  package: string;
  protoPath: string;
  url: string;
  loader?: Record<string, unknown>;
}

@Global()
@Module({})
export class GrpcClientModule {
  static register(options: GrpcClientOptions): DynamicModule {
    return {
      module: GrpcClientModule,
      providers: [
        {
          provide: 'GRPC_CLIENT',
          useFactory: (): ClientGrpc => {
            return ClientProxyFactory.create({
              transport: Transport.GRPC,
              options: {
                package: options.package,
                protoPath: options.protoPath,
                url: options.url,
                loader: options.loader ?? {
                  keepCase: false,
                  longs: String,
                  enums: String,
                  defaults: true,
                  oneofs: true,
                },
              },
            }) as unknown as ClientGrpc;
          },
        },
      ],
      exports: ['GRPC_CLIENT'],
    };
  }
}
