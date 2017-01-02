#! /bin/bash

package_name = "web_ssms"
package_version = "0.0.1"
target = "test"
tar_file = $package_name + "." + $package_version + "-" + $target + ".tar"

npm install
ng build
cp $BUILD_DIR/package.json $BUILD_DIR/dist/package.json
tar -czf $BUILD_DIR/$tar_file --directory="$BUILD_DIR/dist"
npm publish $BUILD_DIR/$tar_file --access public