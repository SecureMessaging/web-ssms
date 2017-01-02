#! /bin/bash

package_name="web-ssms-$BUILD_TARGET"
latest_version=`npm show $package_name version`
size=${#latest_version}

if [ "$latest_version" == 'undefined' && $size gt 8 ]; then
    latest_version="0.0.0"
fi 

version=`node -e "var v = '$latest_version'.split('.'); console.log(v[0] + '.' + v[1] + '.' + parseInt(v[2]) + 1)"`
tar_file="$package_name.$version.tar"

npm install
tsc
#cp $BUILD_DIR/package.json $BUILD_DIR/dist/package.json
sed "3s/.*/\"version\": \"$version\"/" $BUILD_DIR/package.json > $BUILD_DIR/dist/package.json
sed -i "2s/.*/\"name\": \"$package_name\"/" $BUILD_DIR/dist/package.json
echo "Creating TAR file: $BUILD_DIR/$tar_file from $BUILD_DIR/dist"
tar -czf $BUILD_DIR/$tar_file --directory="$BUILD_DIR/dist" .
npm publish $BUILD_DIR/$tar_file --access public

#cp $BUILD_DIR/package.json $BUILD_DIR/dist/package.json
#/tmp/tmp-5638kR934fFhYOF2/

tar -czf /tmp/tmp-5638kR934fFhYOF2//$tar_file --directory="/tmp/tmp-5638kR934fFhYOF2//dist" *