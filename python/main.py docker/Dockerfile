# استفاده از تصویر رسمی Python به عنوان پایه
FROM python:3.8

# کپی کردن فایل main.py به داخل تصویر
COPY main.py /

# تنظیم مسیر کاری به داخل پوشه app
WORKDIR /

# نصب وابستگی‌های پروژه
RUN pip install mysqlclient redis

# دستور برای اجرای فایل main.py
CMD ["python", "main.py"]
