FROM n8nio/n8n:latest

ENV N8N_PORT=7860
ENV N8N_HOST=0.0.0.0
ENV N8N_PROTOCOL=https
ENV N8N_EDITOR_BASE_URL=https://SolutionKacper-VantixN8N.hf.space/
ENV WEBHOOK_URL=https://SolutionKacper-VantixN8N.hf.space/

ENV DB_TYPE=sqlite
ENV DB_SQLITE_DATABASE=/data/database.sqlite
ENV N8N_USER_FOLDER=/data

ENV N8N_SECURE_COOKIE=false
ENV GENERIC_TIMEZONE=Europe/Warsaw

EXPOSE 7860

CMD ["n8n", "start"]
