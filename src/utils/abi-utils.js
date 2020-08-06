import fs from 'fs';
import AppRoot from 'app-root-path';

const abiResolver = () => {
    fs.readdir(AppRoot + '/src/configuration/abi', (err, files) => {
        if (err) {
            throw new Error('abi not resolved');
        }
        const abi_json = fs.readFileSync(AppRoot + '/src/configuration/abi/' + files[0], 'utf8');
        fs.writeFile(AppRoot + '/src/configuration/abi/abi.json', abi_json, (err) => {
            if (err)
                throw new Error('abi not resolved');
            else
                console.log('abi resolved');
        });
    });
}

abiResolver();
