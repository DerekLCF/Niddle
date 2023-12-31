// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class SendBuffer_Model {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):SendBuffer_Model {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsSendBuffer_Model(bb:flatbuffers.ByteBuffer, obj?:SendBuffer_Model):SendBuffer_Model {
  return (obj || new SendBuffer_Model()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsSendBuffer_Model(bb:flatbuffers.ByteBuffer, obj?:SendBuffer_Model):SendBuffer_Model {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new SendBuffer_Model()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

guid(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint8(this.bb!.__vector(this.bb_pos + offset) + index) : 0;
}

guidLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

guidArray():Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? new Uint8Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

dontSave():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

prefix():string|null
prefix(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
prefix(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

seconds():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startSendBuffer_Model(builder:flatbuffers.Builder) {
  builder.startObject(4);
}

static addGuid(builder:flatbuffers.Builder, guidOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, guidOffset, 0);
}

static createGuidVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset {
  builder.startVector(1, data.length, 1);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]!);
  }
  return builder.endVector();
}

static startGuidVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(1, numElems, 1);
}

static addDontSave(builder:flatbuffers.Builder, dontSave:boolean) {
  builder.addFieldInt8(1, +dontSave, +false);
}

static addPrefix(builder:flatbuffers.Builder, prefixOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, prefixOffset, 0);
}

static addSeconds(builder:flatbuffers.Builder, seconds:number) {
  builder.addFieldInt32(3, seconds, 0);
}

static endSendBuffer_Model(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishSendBuffer_ModelBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedSendBuffer_ModelBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

static createSendBuffer_Model(builder:flatbuffers.Builder, guidOffset:flatbuffers.Offset, dontSave:boolean, prefixOffset:flatbuffers.Offset, seconds:number):flatbuffers.Offset {
  SendBuffer_Model.startSendBuffer_Model(builder);
  SendBuffer_Model.addGuid(builder, guidOffset);
  SendBuffer_Model.addDontSave(builder, dontSave);
  SendBuffer_Model.addPrefix(builder, prefixOffset);
  SendBuffer_Model.addSeconds(builder, seconds);
  return SendBuffer_Model.endSendBuffer_Model(builder);
}
}
