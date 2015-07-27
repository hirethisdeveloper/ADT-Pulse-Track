# ADT Pulse Track

ADT Pulse Track is a general purpose utility used to connect to an IMAP enabled email account that is set up to
receive ADT Pulse alerts which then parses each alert and inserts it into a mysql database table. This can be used as
a stepping stone for home automation and logging.

## Installation

1. Check that you have the required software installed where you plan to run this software. See below.
2. Clone the project and enter the directory.
3. Run "npm install" to install all required NodeJS modules.
4. Set up, or gather your IMAP enabled email account information. The app processes emails from the configured "from"
email address sent to the configured "to" email address.
5. Rename the file "Sample_hsa.cfg" to hsa.cfg and fill in the appropriate fields. See below for a description of the
file.
6. Import "database.sql" into your database to create the application's data table.

## Configuration File Format

{
   "from": "Alerts@ADTPulse.com",
   "to"  : "",
    "imap": {
        "user": "",
        "password": "",
        "host": "imap.gmail.com",
        "port": 993,
        "tls": 1
    }
}

**from** - This is the address to expect emails to come from. The address listed in the sample file is a known sender
address from ADT. However if you notice emails coming in from ADT Pulse from another address for alerts, use that
address here.

**to** - This is the email address that the app should confirm in checking the account for email alerts that the email is
directed TO this address. It's a double verification check, "from" and "to" just in case this is a shared or general
email account. Typically this would be set to the same email address you're checking email on.

**imap** - The settings in this sub section define your email IMAP account information. The default provided settings
are set to check a GMail account.

## Usage

Simply type the command:

node app.js

This will execute the application, check the email account, add new entries into the database, delete processed emails,
and exit. Should you want to execute this on a schedule using something as simple as crontab is possible:

crontab -e

* * * * * <PATH TO NODE>/node <PATH TO APP>/app.js


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

The MIT License (MIT)

Copyright (c) 2015 Phil Pastorek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.