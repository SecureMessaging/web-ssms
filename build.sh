#! /bin/bash

dir=`mktemp -d -t build`
package_name = "web_ssms"
package_version = "0.0.1"
target = "test"
tar_file = $package_name + "." + $package_version + "-" + $target + ".tar"

cd $dir

git clone https://github.com/SecureMessaging/apps-ssms.git $dir
npm install
ng build
cp $dir/package.json $dir/dist/package.json
tar -czf $dir/$tar_file --directory="$dir/dist"
npm publish $dir/$tar_file --access public