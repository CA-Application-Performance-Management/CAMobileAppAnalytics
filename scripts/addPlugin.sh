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
PLUGIN_DIR=$PWD/
PROJECT_DIR=''

if [ -z "$1" ]; then
	usage "You must provide the location of your cordova app"
fi

PROJECT_DIR=$1
echo "Installing $PLUGIN_DIR into $PROJECT_DIR"

# Check if they actually added a plist
theDiff=$(cat ./cordova_camdo.plist)

if [ -z "$theDiff" ]; then
	usage "Error : You need a cordova_camdo.plist!!"
fi	

cd $PROJECT_DIR


appDelegate=''
appDelegate=$(find $PWD  -name "AppDelegate.m" -print | grep "platforms.*AppDelegate.m")
if [ -z "$appDelegate" ]; then
    echo "Could not find the AppDelegate to inject library code, check to make sure you have the iOS platform installed"
    cd $PROJECT_DIR
    cordova plugin remove CAMAA
    exit -1;
fi
echo "Injecting code into $appDelegate"

cp -Rf "$appDelegate" AppDelegate
importCamdoReporter="#import \"CAMDOReporter.h\""
importAppDelegate="#import \"AppDelegate.h\""
importLine=$(grep -n "$importAppDelegate" AppDelegate | cut -f1 -d:)
importLineNum=`expr $importLine + 1`
sed -e "${importLineNum}i\\
${importCamdoReporter}\
" AppDelegate > tmp

cp tmp AppDelegate
rm tmp

launchingMethodLineNum=$(grep -n 'didFinishLaunchingWithOptions:(NSDictionary*' AppDelegate | cut -f1 -d:)
initialiseCodeLineNumber=`expr $launchingMethodLineNum + 2`
sed -e "${initialiseCodeLineNumber}i\\
    [CAMDOReporter initializeSDKWithOptions:SDKDefault completionHandler:nil];\
" AppDelegate > tmp

cp tmp AppDelegate
rm tmp

cp AppDelegate "$appDelegate"
rm AppDelegate

cd $PLUGIN_DIR
