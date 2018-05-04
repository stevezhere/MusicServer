# Mini-MusicServer

[**DEMO**]
(http://mini-musicserver.herokuapp.com/)


## Requirement
* Ruby  '>= 2.3.1'
* Rails '>= 5.0.0.1'
* Postgresql '>= 0.18'


## Installation
Install gem dependencies

    bundle install

Setup database

    bundle exec rake db:create
    bundle exec rake db:migrate


## Usage
### For Local Server

    rails server

Access with "Local [IP](https://www.whatismyip.com/) : Port Number" i.e. 192.168.0.15:3000.

### For Public Server

    rails server -b 0.0.0.0 -p 3000

Access with "Public IPv4: Port Number" i.e.
172.16.254.1:3000.

> Remember to setup port forwarding for public server usage. Varies per service providers and modems. Somewhat like:  

>
Modem local IP > Advance Setting > Port Forwarding > Create IPv4
>
* Local IP line: local IP and port to be launched
* External IP line: 0.0.0.0 and same port as local IP


## Deployment
> NOTES ON DEPLOYMENT


## Services
### Future Queues
* Set up Cloud storage i.e. dropbox
* Set up test suite and Travis CI
* Fix known bugs

#### Known Bugs
* Errno::ENOENT: No such file or directory ruby

> At the moment, press refresh and goes away

* Strong params deep munge feature throws error when submit no music to playlist.

> At the moment, there is no noticeable affect on app features. Updated rails version should fix munge issue or add:
>
    config.action_dispatch.perform_deep_munge = false

Be aware of possible security risk with this line.