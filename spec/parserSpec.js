var request = require('request');

var base_url = "http://localhost:3000/"

jasmine.getEnv().defaultTimeoutInterval = 10000;

describe("Scrapping", function (){

  describe("GET /", function(){
    it("should return status code 200 for home", function(done){
      request(base_url, function(error, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /filter/:filter", function(){
    it("should filter value with remote", function(done){
      request(base_url+"filter/iN7h33nD", function(error, response, body){
        var newResult = "<pre> \niN7h33nD 27 days ago \nLocation: FloridaRemote: YesWilling to relocate: PossiblyTechnologies: OS (Linux many flavors, OSX, Windows), databases (PostgreSQL, MySQL, MariaDB, MongoDB), caching (Memcached, Varnish), webservers (Apache, Nginx, Express.js), system tools/terminal (cron, syslog, networking, iptables, yum, apt-get, cd, etc.), Perl, Bash, TDD, Ruby, Rails, Agile, PHP, Laravel, JavaScript, AngularJS, jQuery, Ember.js, Meteor, Gulp, Grunt, Node.js, C++, Sails.js, Git, Subversion, REST API integration, Ovirt, VMWare, Less, SASS, CSS, HTML, ZeroMQ, TCP, UDP, SCTP, SS7, MSRP, JSON, XML, HTTP, IMAP, MM7, Google Protocol Buffers, Sip, SMPP, SNMP, DNS, Diameter, LDAP, SOAP XML, SDP, CPIM, CPM, SMIL, HTTPS, TLS, TelecommunicationsRésumé/CV: contact meEmail: in7h33nd at live dot comI am a back-end developer who currently does Quality Assurance and Web Engineering for a telecommunication company. I have personally had a hand in adding testing support to the listed network protocols and content types and have a lot of exposure working with them. I also work on creating a front end and back end to multiple websites used by my team every day. Including our Automation Testing Platform and Virtual Machine management tool.I love to learn and am eager to work on difficult problems. I am very opinionated on the technologies that I have used and would love to chat about them. I also love to lead teams and iterate on existing products to make things better for the user. Feel free to contact me!\n-----\n</pre>";
        expect(body).toEqual(newResult);
        done();
      });
    });
  });
});
