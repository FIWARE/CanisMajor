import fs from 'fs';
import YAML from 'yaml';
import AppRoot from 'app-root-path';



const configResolver = () => {
    const file = fs.readFileSync(AppRoot + '/src/configuration/config/config.yaml', 'utf8');
    const doc = YAML.parseDocument(file);
    const json = doc.toJSON();
        fs.writeFile(AppRoot+ '/src/configuration/config/config.json', JSON.stringify(json), (err) => {
            if(err) 
                throw new Error('config not resolved');
            else
                console.log('config resolved');
        });
}

configResolver();
