#!/bin/bash

#$cmd="i=0 ; while[ 1 ] ; do sleep 10; moisture=1000 ; java Updator $moisture $i ; i=$[$i+1] ; done"

#eval "$cmd" &

i=0
#while[ 1 ]
while true
do
	sleep 10
	
	## Get values from arduino

	#moisture = ser.readline()
	moisture=1000

	# Update the database
	
	#javac Updator.java
	#java -cp postgresql-42.1.4.jar:. Updator $moisture $i
	


	i=$[$i+1]
done
