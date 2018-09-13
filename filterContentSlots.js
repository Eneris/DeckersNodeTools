const fs = require('fs')
const xml2js = require('xml2js')
const ArgumentParser = require('argparse').ArgumentParser

const argParser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Content slot XML filtering tool'
})

argParser.addArgument(
  ['-f', '--file'],
  {
    help: 'Path to input file',
    type: 'string',
    required: true
  }
)

argParser.addArgument(
  ['-n', '--name'],
  {
    help: 'Name of content slot to filter',
    type: 'string',
    required: true
  }
)

argParser.addArgument(
  ['-o', '--output'],
  {
    help: 'Path to output file',
    type: 'string',
    defaultValue: 'output.xml'
  }
)

const args = argParser.parseArgs()

fs.readFile(args.file, (err, data) => {
  if (err) throw new Error(err)
  console.log('File readed')

  // we then pass the data to our method here
  xml2js.parseString(data, (err, result) => {
    if (err) throw new Error(err)
    console.log('File parsed')
    // here we log the results of our xml string conversion

    console.log(json['slot-configurations']['slot-configuration'].length)

    let json = {
      'slot-configurations': {
        '$': result['slot-configurations']['$'],
        'slot-configuration': result['slot-configurations']['slot-configuration'].filter(item => item['$']['slot-id'] === args.name)
      }
    }

    console.log(json['slot-configurations']['slot-configuration'].length)
    
    // create a new builder object and then convert
    // our json back to xml.
    let builder = new xml2js.Builder()
    let xml = builder.buildObject(json)

    console.log('XML built')

    fs.writeFile(args.output, xml, (err, data) => {
      if (err) throw new Error(err)

      console.log('Output written')

      console.log("successfully written our update xml to file")
    })
  })
}) 