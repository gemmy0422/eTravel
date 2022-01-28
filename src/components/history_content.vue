<template>
    <div class="container">
        <div class="segmentControl fz-0">
            <div class="segment" :class="{active: historyType == '機票'}" @click="historyType = '機票'" v-scroll-to="'#app'">
                <span class="fz-14 text-primary">機票</span>
            </div>
            <div class="segment" :class="{active: historyType == '飯店'}" @click="historyType = '飯店'" v-scroll-to="'#app'">
                <span class="fz-14 text-primary">飯店</span>
            </div>
            <div class="segment" :class="{active: historyType == '租車'}" @click="historyType = '租車'" v-scroll-to="'#app'">
                <span class="fz-14 text-primary">租車</span>
            </div>
        </div>

        <div class="history">
            <p class="fz-24 op-60 ta-center" style="margin-top: 16px;">{{ data_reminder }}</p>
            <ul v-if="historyType == '機票'">
                <li class="historyList_group" v-for="(history, i) in filterType" :key="i">
                    <div class="historyList" @click="history.toggleItem = !history.toggleItem">
                        <span class="fz-12 text-secondary">訂單編號</span>
                        <span class="fz-22 text-primary">{{ history.bookNumber }}</span>
                        <div class="fz-0 historyList_createDate">
                            <span class="fz-12 text-secondary">下訂時間：</span>
                            <span class="fz-12">{{ history.bookDate }}</span>
                        </div>
                        <div class="fz-0 historyList_status" :class="{active: history.toggleItem}">
                            <span class="fz-14" :class="[history.state == '待處理'? 'undo': history.state == '處理中'?'doing': 'done']">{{ history.state }}</span>
                        </div>
                    </div>
                    <div class="historyContainer" :class="{active: history.toggleItem}">
                        <div class="historyContent">
                            <p><span class="mainTitle">機票</span></p>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">出發地</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.departureLocation }}</span></p>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">目的地</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.terminalLocation }}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">出發日</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.departureDate }}</span><span class="text-primary">{{ history.planeTicket.departureWeekDay }}</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.departureTime }}</span></p>
                                </div>
                                <div class="col-6 ta-right" v-if="history.planeTicket.terminalDate !== 'null'">
                                    <p><span class="fz-12 text-secondary">回程日</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.terminalDate }}</span><span class="text-primary">{{ history.planeTicket.terminalWeekDay }}</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.terminalTime }}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">艙等偏好</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.planeClass }}</span></p>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">航空公司偏好</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.planeTicket.planeCompany }}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="historyContent">
                            <p><span class="mainTitle">訂單聯絡人</span></p>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">聯絡人姓名</span></p>
                                    <input type="text" class="p-0 m-0" :value="history.name" readonly>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">聯絡人電話</span></p>
                                    <input type="tel" class="p-0 m-0 ta-right" :value="history.phone" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">聯絡人信箱</span></p>
                                    <input type="email" class="p-0 m-0" :value="history.email" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="historyContent">
                            <p><span class="mainTitle">備註</span></p>
                            <div class="row" style="display: block">
                                <p><span class="fz-12 text-secondary">我的備註</span></p>
                                <p><span class="">{{ history.content }}</span></p>
                            </div>
                            <div class="row" style="display: block">
                                <p><span class="fz-12 text-secondary">服務人員備註</span></p>
                                <p><span class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, deserunt.</span></p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <ul v-if="historyType == '飯店'">
                <li class="historyList_group" v-for="(history, i) in filterType" :key="i">
                    <div class="historyList" @click="history.toggleItem = !history.toggleItem">
                        <span class="fz-12 text-secondary">訂單編號</span>
                        <span class="fz-22 text-primary">{{ history.bookNumber }}</span>
                        <div class="fz-0 historyList_createDate">
                            <span class="fz-12 text-secondary">下訂時間：</span>
                            <span class="fz-12">{{ history.bookDate }}</span>
                        </div>
                        <div class="fz-0 historyList_status" :class="{active: history.toggleItem}">
                            <span class="fz-14" :class="[history.state == '待處理'? 'undo': history.state == '處理中'?'doing': 'done']">{{ history.state }}</span>
                        </div>
                    </div>
                    <div class="historyContainer" :class="{active: history.toggleItem}">
                        <div class="historyContent">
                            <p><span class="mainTitle">飯店</span></p>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">入住飯店</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.hotel.name }}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">入住日</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.hotel.checkInDate }}</span><span class="text-primary">{{ history.hotel.checkInDay }}</span></p>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">退房日</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.hotel.checkOutDate }}</span><span class="text-primary">{{ history.hotel.checkOutDay }}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="historyContent">
                            <p><span class="mainTitle">訂單聯絡人</span></p>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">聯絡人姓名</span></p>
                                    <input type="text" class="p-0 m-0" :value="history.name" readonly>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">聯絡人電話</span></p>
                                    <input type="tel" class="p-0 m-0 ta-right" :value="history.phone" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">聯絡人信箱</span></p>
                                    <input type="email" class="p-0 m-0" :value="history.email" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="historyContent">
                            <p><span class="mainTitle">備註</span></p>
                            <div class="row" style="display: block">
                                <p><span class="fz-12 text-secondary">我的備註</span></p>
                                <p><span class="">{{ history.content }}</span></p>
                            </div>
                            <div class="row" style="display: block">
                                <p><span class="fz-12 text-secondary">服務人員備註</span></p>
                                <p><span class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, deserunt.</span></p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <ul v-if="historyType == '租車'">
                <li class="historyList_group" v-for="(history, i) in filterType" :key="i">
                    <div class="historyList" @click="history.toggleItem = !history.toggleItem">
                        <span class="fz-12 text-secondary">訂單編號</span>
                        <span class="fz-22 text-primary">{{ history.bookNumber }}</span>
                        <div class="fz-0 historyList_createDate">
                            <span class="fz-12 text-secondary">下訂時間：</span>
                            <span class="fz-12">{{ history.bookDate }}</span>
                        </div>
                        <div class="fz-0 historyList_status" :class="{active: history.toggleItem}">
                            <span class="fz-14" :class="[history.state == '待處理'? 'undo': history.state == '處理中'?'doing': 'done']">{{ history.state }}</span>
                        </div>
                    </div>
                    <div class="historyContainer" :class="{active: history.toggleItem}">
                        <div class="historyContent">
                            <p><span class="mainTitle">租車</span></p>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">租車地</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.startLocation }}</span></p>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">還車地</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.endLocation }}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">租車日</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.startDate }}</span><span class="text-primary">{{ history.rentCar.startDay }}</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.startTime }}</span></p>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">還車日</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.endDate }}</span><span class="text-primary">{{ history.rentCar.endDay }}</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.endTime }}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">指定車款</span></p>
                                    <p><span class="fz-20 text-primary">{{ history.rentCar.preferCar }}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="historyContent">
                            <p><span class="mainTitle">訂單聯絡人</span></p>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">聯絡人姓名</span></p>
                                    <input type="text" class="p-0 m-0" :value="history.name" readonly>
                                </div>
                                <div class="col-6 ta-right">
                                    <p><span class="fz-12 text-secondary">聯絡人電話</span></p>
                                    <input type="tel" class="p-0 m-0 ta-right" :value="history.phone" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 ta-left">
                                    <p><span class="fz-12 text-secondary">聯絡人信箱</span></p>
                                    <input type="email" class="p-0 m-0" :value="history.email" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="historyContent">
                            <p><span class="mainTitle">備註</span></p>
                            <div class="row" style="display: block">
                                <p><span class="fz-12 text-secondary">我的備註</span></p>
                                <p><span class="">{{ history.content }}</span></p>
                            </div>
                            <div class="row" style="display: block">
                                <p><span class="fz-12 text-secondary">服務人員備註</span></p>
                                <p><span class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, deserunt.</span></p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            historyType: '機票',
            histories: [],
            data_reminder: '資料讀取中'
        }
    },
    methods:{
    },
    mounted(){
        this.$store.dispatch('DATA_READ').then(() => {
            this.histories = this.$store.state;
            if(this.histories) this.data_reminder = '';
            else this.data_reminder = '目前尚未有預訂紀錄';
        })
    },
    computed:{
        filterType: function() {
            let let_bookInput = this.histories.bookInput;
            if(!let_bookInput) return false;
            let destructBookInput = Object.values(let_bookInput);

            let planeTicket = destructBookInput.filter(item => {
                return item.planeTicket !== undefined
            });
            let hotel = destructBookInput.filter(item => {
                return item.hotel !== undefined
            });
            let rentCar = destructBookInput.filter(item => {
                return item.rentCar !== undefined
            });

            if(this.historyType == '機票') return planeTicket
            else if(this.historyType == '飯店') return hotel
            else if(this.historyType == '租車') return rentCar
            else return false
        }
    },
}
</script>

<style lang="sass" scoped>
.historyList
	position: relative
	display: inline-flex
	align-items: center
	width: 100%
	height: 48px
	padding: 12px
	margin-top: 8px
	background: #fff
	&:nth-of-type(2)
		margin-top: calc(60px + 16px)
	> span:first-child
		padding-right: 4px
.undo
	color: #ff8080
.doing
	color: #85a1ff
.done
	color: #64b964
.historyContainer
	display: none
	padding-bottom: 12px
	border-top: 1px solid rgba(0,0,0,0.15)
	background: #fff
	&.active
		display: block
.historyContent
	padding: 12px
	.row
		width: 100%
		padding: 12px 18px 0
</style>