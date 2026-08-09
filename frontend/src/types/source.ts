export interface ServiceHealth {
  api: string;
  database: string;
  redis: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  services: ServiceHealth;
}

export interface Source {
  id: string;
  name: string;
  type: string;
  url: string;
  isActive: boolean;
  lastFetched?: string;
}
