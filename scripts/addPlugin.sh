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
echo "Installing \"$PLUGIN_DIR\" into \"$PROJECT_DIR\""

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
echo "Injecting code into $appDelegate"

cp -Rf "$appDelegate" AppDelegate
importCamdoReporter="#import \"CAMDOReporter.h\""
importAppDelegate="#import \"AppDelegate.h\""
importLine=$(grep -n "$importAppDelegate" AppDelegate | cut -f1 -d:)
importLineNum=$((importLine+1))
sed -e "${importLineNum}i\\
${importCamdoReporter}\
" AppDelegate > tmp

cp tmp AppDelegate
rm tmp

launchingMethodLineNum=$(grep -n 'didFinishLaunchingWithOptions:(NSDictionary*' AppDelegate | cut -f1 -d:)
initialiseCodeLineNumber=$((launchingMethodLineNum+2))
sed -e "${initialiseCodeLineNumber}i\\
    [CAMDOReporter initializeSDKWithOptions:SDKDefault completionHandler:nil];\
" AppDelegate > tmp

cp tmp AppDelegate
rm tmp

cp AppDelegate "$appDelegate"
rm AppDelegate

cd "$PLUGIN_DIR"


# this is to add Quasar boot file
ConfigFile="$PROJECT_DIR/../quasar.conf.js"
bootFile=$PROJECT_DIR"/../src/boot/dxaxa.js"

if [ -f "${ConfigFile}" ] && [ ! -f "${bootFile}" ]; then

    quasar new boot dxaxa.js

    echo "" > ${bootFile}
    echo "import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router}) => {
  router.afterEach((to, from) => {
    setTimeout(function() {
      CaMDOIntegration.viewLoaded(to.name ? to.name : to.path,0.25,\"YES\",function (action,returnValue,error) {
      })
    }, 200)
  })
})
" > ${bootFile}
	
	#add 'dxaxa.js' in quasar.config.js under boot
	bootArray=($(sed '/boot: /,/]/!d' "$ConfigFile"))
	if (( ${#bootArray[@]} > 0)) 
	then
		bootStartLineNum=$(grep -n 'boot: \[' "$ConfigFile" | cut -f1 -d:)
		dxaxaAddlineNum=$((bootStartLineNum+1))

		addText=''
		if (( ${#bootArray[@]} > 3)) 
		then
			addText="'dxaxa',"
		else
			addText="'dxaxa'"
		fi	

		sed -e "${dxaxaAddlineNum}i\\
			$addText\
			" "$ConfigFile" > tmp
		cp tmp "$ConfigFile"
		rm tmp
	else
		echo "$(tput bold)boot$(tput sgr0) entry in your ${bold}quasar.config.js$normal file is not available. Please make sure to reference \033[1;32mdxaxa\033[m boot file in your quasar.config.js file as below\n \033[1;32mboot: [
    'dxaxa'
 ]\033[m"
	fi

else 
    echo "\n Quasar config file does not exist. or boot file already exists"
fi
