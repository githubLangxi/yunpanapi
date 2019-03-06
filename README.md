# vlog_admin_api.gankao.com
运营子后台数据服务API


# 开发纪要： #
ad_subject
id
name
laddingpage_pc
laddingpage_h5
totalClick 冗余字段

ad_location
name
code //广告位识别码，不能更改
ltype //展示方式类型：图文轮播/文字轮播/次序弹屏/。。。
comment
width //广告位宽度
height//广告位高度
totalclick 冗余字段

ad_showmanage
id
adSubjectID
adLocationID
startTime
endTime
status(sequelize虚字段，根据start/end时间计算而得，用于前台显示)
totalClick_today 冗余字段
totalClick_yesterday 冗余字段
sort 同一广告位内的排序次序

AdViewLog
广告展示点击日志明细

AdViewLogSummaryByDay
adSubjectID
adLocationID
totalclick
tDay
广告展示点击量日汇总（主题/广告位/日期），用存储过程定时器执行，或node中计划任务执行（node-schedule）


#Sequelize自动生成数据表对应文件
sequelize-auto -o "src/tables" -d gankao -h localhost -u root -p 3306 -x "" -e mysql -t [page_modules,page_index_bases,study_tools,my_study_menus]
