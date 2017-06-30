// @flow

import {observable, action, computed} from 'mobx'

export default class PomoStore {
	@observable timeSession = 10
	@observable timeSessionLeft = this.timeSession
	@observable pomoStatus = 'stopped'
	// started, paused, stopped, done
	@observable pauseAllowed = true
	@observable timePause = 5
	@observable timePauseLeft = this.timePause
	@observable timeBreak = 5
	@observable timeBreakLeft = this.timeBreak
	@observable timeLBreak = 10
	@observable sessionCount = 0

	@action	changeStatus(command) {
		switch (command) {
			case 'start':
				clearInterval(this.interval)
				this.timePauseLeft = this.timePause
				timeBreakLeft = this.timeBreakLeft

				this.pomoStatus = 'started'
				this.interval = setInterval(() => {
					this.count(this.timeSessionLeft)
				}, 1000)
				break
			case 'break':
				clearInterval(this.interval)
				this.pomoStatus = 'breaked'
				this.interval = setInterval(() => {
					this.count(this.timeBreakLeft)
				}, 1000)
				break
			case 'void':
				this.sessionCount--
				break
			case 'pause':
				clearInterval(this.interval)
				this.pomoStatus = 'paused'
				this.interval = setInterval(() => {
					this.count(this.timePauseLeft)
				}, 1000)
				break
			case 'abort':
				clearInterval(this.interval)
				this.timeSessionLeft = this.timeSession
				this.pomoStatus = 'stopped'
				break
		}
	}

	@action count(secs) {
		if (secs > 1) {
			if (this.pomoStatus == 'paused') {
				this.timePauseLeft--
			} else if (this.pomoStatus == 'breaked') {
				this.timeBreakLeft--
			} else {
				this.timeSessionLeft--
			}
		} else {
			if (this.pomoStatus == 'paused') {
				this.timePauseLeft--
				this.pomoStatus = 'stopped'
				this.timePauseLeft = this.timePause
				this.timeSessionLeft = this.timeSession
			} else if (this.pomoStatus == 'breaked') {
				this.timeBreakLeft--
				this.pomoStatus = 'stopped'
				this.timeBreakLeft = this.timeBreak
			} else {
				this.timeSessionLeft--
				this.sessionCount++
				this.pomoStatus = 'breaked'
				this.timeSessionLeft = this.timeSession
			}
			clearInterval(this.interval)

			//long break if count is something divided by number
			// of sessions streak! Which can be nullified after period of time


		}
	}

	@observable firstName = 'Sen'
	@observable lastName = 'Appleseed'
	@observable email = 'send@appleseed.com'
	@observable phone = '1155667788'

	@action	data(data: Object) {
		if (data.firstName) {
			this.firstName = data.firstName
		}
		if (data.lastName) {
			this.lastName = data.lastName
		}
		if (data.email) {
			this.email = data.email
		}
		if (data.phone) {
			this.phone = data.phone
		}
	}

	@computed get fullName(): string {
		return `${this.firstName} ${this.lastName}`
	}

	// An interesting function is the fullName function. It is basically computed out of firstName and lastName observable fields.
	// MobX strongly encourages to keep the state information as minimal as possible and derive other state information
	// with @computed get decorators that are pure functions of other observable fields.
	// <Text>FullName: {this.props.pomoStore.fullName}</Text>
}

// export default new Store();
