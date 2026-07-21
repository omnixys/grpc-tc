import { Transport } from '@nestjs/microservices';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

export interface GrpcServerOptions {
  package: string;
  protoPath: string;
  url: string;
  loader?: Record<string, unknown>;
}

export function createGrpcServerOptions(
  options: GrpcServerOptions,
): MicroserviceOptions {
  return {
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
  };
}
