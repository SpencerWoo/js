import fsPromises from 'fs/promises';
import path from 'path';

async function* filenameGenerator(dirPath) {
	const dirList = await fsPromises.readdir(dirPath, {withFileTypes: true})

	for (const dirEnt of dirList) {
		const fileOrDir = path.resolve(dirPath, dirEnt.name)

		if (dirEnt.isDirectory()) {
			yield* filenameGenerator(fileOrDir);
		} else {
			yield fileOrDir;
		}
	}
}

const generator = filenameGenerator(process.argv[2]);

for await (const file of generator) {
	console.log(file);
}
