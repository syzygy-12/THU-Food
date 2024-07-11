package APIs.EntryAPI

import Common.API.API
import Global.ServiceCenter.entryServiceCode
import io.circe.Decoder

abstract class EntryMessage[ReturnType:Decoder] extends API[ReturnType](entryServiceCode)
