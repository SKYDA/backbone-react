/**
 * @file test import react service
 *
 * @auth gushouchuang
 * @date 2018-1-4
 */

import { getJSON } from 'dataservice'

const getTestReactUserList = params => {
    return getJSON('/community-mgr-war/testreact/getUserList.action', params)
}

export default {
    getTestReactUserList,
}