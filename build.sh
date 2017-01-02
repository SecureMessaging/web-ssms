#! /bin/bash

package_name="web_ssms"
package_version="0.0.1"
target="test"
tar_file="$package_name.$package_version.$target.tar"

npm install
tsc
cp $BUILD_DIR/package.json $BUILD_DIR/dist/package.json
tar -czf $BUILD_DIR/$tar_file --directory="$BUILD_DIR/dist" .
npm publish $BUILD_DIR/$tar_file --access public

#cp $BUILD_DIR/package.json $BUILD_DIR/dist/package.json
#/tmp/tmp-5638kR934fFhYOF2/

tar -czf /tmp/tmp-5638kR934fFhYOF2//$tar_file --directory="/tmp/tmp-5638kR934fFhYOF2//dist" *