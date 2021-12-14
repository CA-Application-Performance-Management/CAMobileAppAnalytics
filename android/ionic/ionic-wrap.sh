#!/bin/bash
##
## Ionic CA Wrapper hook script.
##


starttime=$(date +%s)
_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
_file="${_dir}/$(basename "${BASH_SOURCE[0]}")"
_workdir=${PWD}
echo
echo "|******* CA Mobile App Analytics (for IONIC Pro) *****|"
echo "Running ionic wrapper  ${_file} on dir ${_workdir}"
echo

#function to find the index
strindex() { 
  x="${1%%$2*}"
  [[ "$x" = "$1" ]] && echo -1 || echo "${#x}"
}

#Gets SDk directory. -S option in cordova commandline
getSDKDir(){
	arrIN=($1)
	total=${#arrIN[*]}
	# 
	for (( i=0; i<=$(( $total -1 )); i++ ))
	do 
	    if [ "${arrIN[$i]}" == "-S" ]; then
            echo "${arrIN[$i+1]}"
            return 0;
        fi
	done
	echo ""
	return 1;
}


if [ -f AndroidWrappingOptions ]
then
# command line options has to be feed from a file, that needs to be commited as part of the source
  echo "reading wrap parameters from AndroidWrappingOptions file"
  params=$(cat AndroidWrappingOptions | egrep -o '___WRAP_OPTIONS.*=.*' | egrep -o '=.*' | egrep -o '[^=]+')
else
# if ionic-pro allows to give commandline options for package, from their dashboard  
  echo "reading wrap parameters from commandline"
  params="${CORDOVA_CMDLINE:($(strindex "$CORDOVA_CMDLINE" android)+8)}"
fi  

echo "Input params: ${params}"
CA_SDK_DIR=$(getSDKDir "$params");



#------------- Validations ------------------ #
validateSDK()
{
   if [[ -z "${CA_SDK_DIR// }" ]]
   then
   	echo " Configuration error: empty SDK Directory "
      exit -1;
   fi	
   if [ ! -d "${CA_SDK_DIR}" ]
   then
      echo " Configuration error: SDK not found at location : ${CA_SDK_DIR} "
      exit -1;
   fi
   #Remove -S param from input parma list before passing across to wrap.sh
   params=${params/-S "${CA_SDK_DIR}"/""}
}

validateSDK
#------------- Validations ------------------ #
echo "Modified Input params: ${params}"

echo "changing work dir to ${CA_SDK_DIR}"
cd "${CA_SDK_DIR}"

#command="wrap.sh ${params}"
command="./wrap.sh ${params}"
#(exec  "$command")
./wrap.sh $params
#sh wrap.sh "${params}"
echo "changing work dir back to ${_workdir}"
cd "${_workdir}"

