# MedEZ
A project made with ❤️ by
- [@imraunn](https://github.com/imraunn)
- [@milan0027](https://github.com/milan0027)
- [@Mayank2602](https://github.com/Mayank2602)
- [@malav22](https://github.com/malav22)

### Problem Statement
In today's world, people face the issue of having to compare prices of medicines in their prescriptions across various online platforms, which can be a hectic task especially when dealing with multiple medications. This problem becomes even more significant when expensive medications need to be purchased, as it could result in potential savings of up to 80% in some cases. From identifying the names of the medications in a prescription to actually purchasing them from an online pharmacy and keeping track of their dosage, the process can be overwhelming for a patient, and there is a need to simplify it.

### Solution
- Our solution aims to simplify the process of purchasing and managing medications for patients by integrating various technologies. We will use **Optical Character Recognition (OCR)** to extract medication details from prescriptions using **Google Cloud Vision**. We will then employ the Med7 **machine learning model** from **spaCy** to extract the medication names, dosages, and frequencies.

- To ensure efficient retrieval and management of data, we will cache the extracted medication details and prices in a database. The backend, written in Python, will handle data processing, price comparisons, and medication scheduling using multi-threading to optimize performance. We will use **web scraping techniques** to fetch medication prices from various online pharmacies.

- For the frontend, we will develop a **React-based user interface** that will showcase medication details, including names, dosages, durations, and prices from various websites. Additionally, the frontend will feature a calendar where patients can schedule medication reminders and track their dosages. The calendar will be integrated with **Google Calendar**, allowing patients to receive reminders across devices and platforms.

- Our solution aims to simplify the medication purchasing process for patients, provide them with valuable cost-saving opportunities, and ensure that they can easily track and manage their medication schedules.

### Installation steps:
``` 
git clone https://github.com/milan0027/MedEZ/
```
```
cd MedEZ
```
- ### Development Mode
  #### Flask Endpoint:
  ```
  cd flask_server
  ```
  ```
  pip install -r requirements.txt
  ```
  ```
  flask run
  ```

  #### React Endpoint:
  ```
  cd client
  ```
  ```
  npm install
  ```
  ```
  npm start
  ```

  #### NodeJS Endpoint:
  ```
  cd server
  ```
  ```
  npm install
  ```
  ```
  npm start
  ```
  - The React Frontend will be hosted at port 3000 
  - The Flask Backend will be hosted at port 5000
  - The NodeJS Backend will be hosted at port 8080
- ### Production Mode
  #### Nginx Configuration:
  ```
  sudo apt install nginx
  ```
  ```
  nano /etc/nginx/sites-available/default
  ```

  ```
  server {
    listen 80;
    server_name medez.co.in;

    root /var/www/html;
    index index.html index.htm;
    try_files $uri /index.html;
    location / {
        try_files $uri $uri/ = 404;
    }
  }
  server {
      listen 80;
      server_name flaskapi.medez.co.in;
      location / {
                  include proxy_params;
                  proxy_pass http://localhost:5000;
      }
  }
  server {
      listen 80;
      server_name api.medez.co.in;
      location / {
          proxy_set_header Host $host;
          proxy_pass http://localhost:8080;
          proxy_redirect off;
          proxy_buffering off;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-Host $host;
          proxy_set_header X-Forwarded-Port $server_port;
      }
  }
  ```
  ```
  systemctl restart nginx
  ```
  #### React Endpoint:
  ```
  cd client
  ```
  ```
  npm install
  ```
  ```
  npm run build
  ```
  ```
  mv build/* /var/www/html
  ```
  #### NodeJS Endpoint:
  ```
  cd server
  ```
  ```
  npm install
  ```
  ```
  npm install pm2 -g
  ```
  ```
  pm2 start index.js -i max
  ```
  #### Flask Endpoint:
  ```
  cd flask_server
  ```
  ```
  pip install -r requirements.txt
  ```
  ```
  pip install gunicorn
  ```
  ```
  nano /etc/systemd/system/flaskapi.service
  ```
  ```
  [Unit]
  Description=Gunicorn instance to serve Flask
  After=network.target
  [Service]
  User=ubuntu
  Group=ubuntu
  WorkingDirectory=/home/ubuntu/MedEZ/flask_server/
  ExecStart=gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
  [Install]
  WantedBy=multi-user.target
  ```
  ```
  sudo systemctl start flaskapi
  ```
  ```
  sudo systemctl enable flaskapi
  ```
