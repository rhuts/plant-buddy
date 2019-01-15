#!/bin/bash

db_user="csc301app3"
db_hostname="mcsdb.utm.utoronto.ca"
db_name="csc301app3"
db_password="29lnclkmlkn2oi34nc,.g"

sed -e "s/DB_NAME/$db_name/" -e "s/DB_HOSTNAME/$db_hostname/" -e "s/DB_USER/$db_user/" -e "s/DB_PASSWORD/$db_password/" dbconnect_string_template.php > ../lib/dbconnect_string.php

psql "dbname='$db_name' user='$db_user' password='$db_password' host='$db_hostname'" -f schema.sql