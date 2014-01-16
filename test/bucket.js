var should = require('should')
var uuid   = require('node-uuid')
var config = require('./config')
var OSS    = require('../index')
var oss    = new OSS.createClient(config)

describe('bucket', function () {
	var bucketName = uuid.v4();

	it('create bucket', function (done) {
		oss.createBucket({
			bucket: bucketName,
			acl: 'public-read'
		}, function (error, result) {
			should.not.exist(error)
			result.statusCode.should.equal(200)
			done()
		})
	})

	it('get bucket list', function (done) {
		oss.listBucket(function (error, result) {
			should.not.exist(error)
			should.exist(result.ListAllMyBucketsResult)
			done()
		})
	})

	it('get bucket acl', function (done) {
		oss.getBucketAcl(bucketName, function (error, result) {
			should.not.exist(error)
			should.exist(result.AccessControlPolicy)
			done()
		})
	})

	it('set bucket acl', function (done) {
		oss.setBucketAcl({
			bucket: bucketName,
			acl: 'private'
		}, function (error, result) {
			should.not.exist(error)
			result.statusCode.should.equal(200)
			done()
		})
	})

	it('delete bucket', function (done) {
		oss.deleteBucket(bucketName, function (error, result) {
			should.not.exist(error)
			result.statusCode.should.equal(204)
			done()
		})
	})
})
