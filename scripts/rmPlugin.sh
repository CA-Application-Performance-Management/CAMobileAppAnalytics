#!/bin/sh
# This script will overwrite the default AppDelegate.mgs



usage()
{

echo Error : "$1"
cat << EOF

Set build options in AppDelegateOptions

EOF

exit -1;
}




res=''
res=$(pwd | egrep '/scripts')

if [ -z "$res" ];  then
usage  "This script should be called by the Cordova hook!"
fi

cd ../
PLUGIN_DIR="$PWD"/
PROJECT_DIR=''

if [ -z "$1" ]; then
usage "You must provide the location of your cordova app"
fi

PROJECT_DIR=$1
echo "Removing \"$PLUGIN_DIR\" from \"$PROJECT_DIR\""

# Check if they actually added a plist
theDiff=$(cat ./cordova_camdo.plist)

if [ -z "$theDiff" ]; then
usage "Error : You need a cordova_camdo.plist!!"
fi

cd "$PROJECT_DIR"

appDelegate=''
appDelegate=$(find "$PWD"  -name "AppDelegate.m" -print | grep "platforms.*AppDelegate.m")
if [ -z "$appDelegate" ]; then
    echo "Could not find the AppDelegate to inject library code, check to make sure you have the iOS platform installed"
    cd "$PROJECT_DIR"
    cordova plugin remove CAMAA
    exit -1;
fi
echo "Removing plugin code from $appDelegate"

cp -Rf "$appDelegate" AppDelegate

initialiseCodeLineNumber=$(grep -n 'CAMDOReporter initializeSDKWithOptions.*' AppDelegate | cut -f1 -d:)
echo "line no : $initialiseCodeLineNumber"
importCamdoReporter="#import \"CAMDOReporter.h\""

if grep -q "$importCamdoReporter" AppDelegate
    then
        if (( ${#initialiseCodeLineNumber[@]} > 0))
        then
            lineNums=''
            for i in ${initialiseCodeLineNumber[@]}
            do 
                lineNums="$lineNums${i}d;"
            done

            sed -e $lineNums AppDelegate > tmp
            cp tmp AppDelegate
            rm tmp
        fi

        importLineNumber=$(grep -n "$importCamdoReporter" AppDelegate | cut -f1 -d:)
        if (( ${#importLineNumber[@]} > 0))
        then
            lineNums=''
            for i in ${importLineNumber[@]}
            do 
                lineNums="$lineNums${i}d;"
            done

            sed -e $lineNums AppDelegate > tmp
            cp tmp AppDelegate
            rm tmp
        fi

        cp AppDelegate "$appDelegate"
        rm AppDelegate
    else
        exit -1;
fi

cd "$PLUGIN_DIR"

# this is to remove Quasar boot file
ConfigFile="$PROJECT_DIR/../quasar.conf.js"
BootFolder="$PROJECT_DIR/../src/boot/"


cd "${BootFolder}"
rm -rf "dxaxa.js"

dxaxalineNum=($(grep -n "'dxaxa.*" "${ConfigFile}" | cut -f1 -d:))
echo "$dxaxalineNum"

if (( ${#dxaxalineNum[@]} > 0))
then
    lineNums=''
    for i in ${dxaxalineNum[@]}
    do 
        lineNums="$lineNums${i}d;"
    done

    sed -e $lineNums "$ConfigFile" > tmp
    cp tmp "$ConfigFile"
    rm tmp
fi