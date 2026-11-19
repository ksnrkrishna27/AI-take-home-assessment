1. Open Docker Desktop and wait until it says Running.
2. Open PowerShell:

cd "C:\Users\ksnrk\Documents\chubb-assesment\demo-app-qa-main"

3. Start infrastructure:

docker compose -f docker-compose.infra.yml up -d

4. Start the application:

docker compose -f docker-compose.apps.yml up --build -d

5. Check container status:

docker compose -f docker-compose.infra.yml ps
docker compose -f docker-compose.apps.yml ps

6. Open:

http://localhost:3001

If you again see COPY target/\*.jar, rebuild the services:

cd code\claims-service
.\mvnw.cmd package -Dmaven.test.skip=true -Dcheckstyle.skip -Dpmd.skip

cd ..\bff-service
.\mvnw.cmd package -Dmaven.test.skip=true -Dcheckstyle.skip -Dpmd.skip

cd ..\..
docker compose -f docker-compose.apps.yml up --build -d
