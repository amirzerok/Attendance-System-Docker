# انتخاب یک تصویر پایه مناسب برای پایتون
FROM python:3.9-slim

# نصب نیازمندی‌های مورد نیاز
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx libglib2.0-0 && \
    apt-get install -y python3-opencv && \
    apt-get clean

# نصب کتابخانه‌های پایتون
RUN pip install redis mysql-connector-python persiantools numpy

# اضافه کردن کد پایتون به داکر ایمیج
ADD . /app
WORKDIR /app

# اجرای اسکریپت پایتون
CMD ["python", "your_script.py"]
