# Keycloak with OpenTelemetry (OTEL/OTLP)

This repo is an example for Keycloak 17+ (Quarkus based distribution, not for 
Keycloak legacy 17+ or Keycloak 17-).

Single click provisioning 
[![Gitpod ready-to-test](https://img.shields.io/badge/Gitpod-ready--to--test-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jangaraj/keycloak-with-opentelemetry/) 
- Keycloak login: `admin/admin`
- Cribl login: `admin/adminadmin`

## Stack

![Infrastructure](https://raw.githubusercontent.com/jangaraj/keycloak-with-opentelemetry/main/doc/diagram.png)

### Metrics

[OTEL Java agent with autoinstrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation)
generates OTLP metrics and pushs them to 
[OTEL collector](https://github.com/open-telemetry/opentelemetry-collector-contrib). 
Keycloak exports metrics to `/metrics` endpoint and 
[OTEL collector](https://github.com/open-telemetry/opentelemetry-collector-contrib)
scrapes them.
[OTEL collector](https://github.com/open-telemetry/opentelemetry-collector-contrib)
exports all collected metrics to [Prometheus](https://github.com/prometheus/prometheus)

### Traces

[OTEL Java agent with autoinstrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation)
generates traces and sends them to [OTEL collector](https://github.com/open-telemetry/opentelemetry-collector-contrib)
which exports them to [Jaeger](https://github.com/jaegertracing/jaeger)

### Logs

Keycloak generates JSON logs, which are processed by Logspout/Logstash and inserted to Elasticsearch.

### Visualization

All observability sources (metrics, traces, logs) are aggregated/visualized 
in the [Grafana](https://github.com/grafana/grafana).
