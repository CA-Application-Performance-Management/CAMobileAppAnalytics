#!/bin/sh
# This script will add the OTHER_LDFLAGS in build.xcconfig



usage()
{

echo Error : "$1"
cat << EOF

Set pluginLinkerflags in buildxcconfig

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

# Check if they actually added a plist
configFile=$(cat ./src/ios/ca-maa-ios-sdk.xcconfig)
if [ -z "$configFile" ]; then
usage "Error : You need a ca-maa-ios-sdk.xcconfig!!"
fi

pluginLinkerflags=$(cat ./src/ios/ca-maa-ios-sdk.xcconfig | egrep -o '^OTHER_LDFLAGS=.*')

cd $PROJECT_DIR

buildxcconfig=''
buildxcconfig=$(find $PWD  -name "build.xcconfig" -print | grep "platforms.*build.xcconfig")
if [ -z "$buildxcconfig" ]; then
echo "Could not find the build.xcconfig to inject library code, check to make sure you have the iOS platform installed"
cd $PROJECT_DIR
cordova plugin remove CAMAA
exit -1;
fi
echo "Removing axa code from $buildxcconfig"

cp $buildxcconfig cordovaConfigFile

if grep -q "$pluginLinkerflags" cordovaConfigFile
    then
        sed "s|$pluginLinkerflags||g" cordovaConfigFile > tmp
    else
        flags=$(cut -d "=" -f2 <<<"$pluginLinkerflags")
        sed "s|$flags||g" cordovaConfigFile > tmp
fi

cp tmp cordovaConfigFile
rm tmp

cp cordovaConfigFile $buildxcconfig
rm cordovaConfigFile
