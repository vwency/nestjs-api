export interface DatabaseConfig {
  type: any;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  entities: string[];
  autoLoadEntities: boolean;
  synchronize: boolean;
}
